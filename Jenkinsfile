pipeline {
    agent any

    tools {
    nodejs "Node18"
}
    parameters {
        string(name: 'ECR_REPO_NAME', defaultValue: 'amazon-prime', description: 'Enter repository name')
        string(name: 'AWS_ACCOUNT_ID', defaultValue: '463470954735', description: 'Enter AWS Account ID')
    }
    
    environment {
        SCANNER_HOME = tool 'SonarQube Scanner'
        PYTHON = '/usr/bin/python3' // Reference the installed Python executable directly
        PIP = '/usr/bin/pip3'        // Reference pip3 
    }
    
    stages {
        
        stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('sonar-server') {
            script {
                def sonarProjectKey = "mvp-${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                def sonarProjectName = "MVP ${env.BRANCH_NAME} Build ${env.BUILD_NUMBER}"
                
                sh """
                $SCANNER_HOME/bin/sonar-scanner \
                  -Dsonar.projectKey=${sonarProjectKey} \
                  -Dsonar.projectName='${sonarProjectName}' \
                  -Dsonar.sources=database,k8s_files,model,services,app.py,chatbot5.py \
                  -Dsonar.inclusions=**/*.py,**/*.html \
                  -Dsonar.exclusions=**/venv/**,**/site-packages/**,**/__pycache__/**,**/*.so,node_modules/**
                """
                    }
                }
            }
        }
        

        /*
        stage('3. Quality Gate') {
            steps {
                waitForQualityGate abortPipeline: false, 
                credentialsId: 'sonar-token'
            }
        }
        */
        
            stage('Install Python Dependencies') {
            steps {
                script {
                    echo 'Setting up Python virtual environment & installing dependencies'
                    sh """
                        python3 -m venv venv
                        . venv/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt
                    """
            }
        }
    }

        stage('Run Tests') {
            steps {
                script {
                    echo 'Checking if tests exist'
                    def test_files = sh(script: "find tests/ -type f -name '*.py' | wc -l", returnStdout: true).trim()
        
                    if (test_files.toInteger() > 0) {
                        echo 'Running Python tests'
                        sh """
                            . venv/bin/activate
                            pytest tests/
                        """
                    } else {
                        echo 'No tests found. Skipping pytest.'
                    }
                }
            }
        }

        stage('Run FastAPI App') {
    steps {
        script {
            echo 'Launching FastAPI app in background'
            sh '''
                . venv/bin/activate
                nohup uvicorn app:app --host 127.0.0.1 --port 8000 --reload &
                sleep 5
            '''
        }
    }
}


        
        stage('Run API Tests') {
    steps {
        sh '''
            . venv/bin/activate
            newman run tests/postman/api-tests.postman_collection.json \
              -e tests/postman/dev-env.postman_environment.json \
              --reporters cli,junit
        '''
    }
}



        
        stage('Trivy Scan') {
    steps {
        script {
            echo "Running Trivy vulnerability scan on Python dependencies"

            // Run Trivy scan and capture output
            sh '''
                trivy fs --scanners vuln --cache-dir /tmp/trivy-cache . > trivy.txt
                CRITICAL_COUNT=$(grep "CRITICAL" trivy.txt | wc -l || echo 0)
                
                echo "Number of critical vulnerabilities found: $CRITICAL_COUNT"
                
                if [ "$CRITICAL_COUNT" -ne 0 ]; then
                    echo "Skipping failure for now and proceeding to the next stage."
                fi
            '''
                }
            }
        }

        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${params.ECR_REPO_NAME} ."
            }
        }

        stage('Create ECR repo') {
            steps {
                withCredentials([string(credentialsId: 'access-key', variable: 'AWS_ACCESS_KEY'), 
                                 string(credentialsId: 'secret-key', variable: 'AWS_SECRET_KEY')]) {
                    sh """
                    aws configure set aws_access_key_id $AWS_ACCESS_KEY
                    aws configure set aws_secret_access_key $AWS_SECRET_KEY
                    aws ecr describe-repositories --repository-names ${params.ECR_REPO_NAME} --region us-east-1 || \
                    aws ecr create-repository --repository-name ${params.ECR_REPO_NAME} --region us-east-1
                    """
                }
            }
        }
        
        stage('Login to ECR & tag image') {
            steps {
                withCredentials([string(credentialsId: 'access-key', variable: 'AWS_ACCESS_KEY'), 
                                 string(credentialsId: 'secret-key', variable: 'AWS_SECRET_KEY')]) {
                    sh """
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${params.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com
                    docker tag ${params.ECR_REPO_NAME} ${params.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${params.ECR_REPO_NAME}:${BUILD_NUMBER}
                    docker tag ${params.ECR_REPO_NAME} ${params.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${params.ECR_REPO_NAME}:latest
                    """
                }
            }
        }
        
        stage('Push image to ECR') {
            steps {
                withCredentials([string(credentialsId: 'access-key', variable: 'AWS_ACCESS_KEY'), 
                                 string(credentialsId: 'secret-key', variable: 'AWS_SECRET_KEY')]) {
                    sh """
                    docker push ${params.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${params.ECR_REPO_NAME}:${BUILD_NUMBER}
                    docker push ${params.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${params.ECR_REPO_NAME}:latest
                    """
                }
            }
        }
        
        stage('Cleanup Images') {
            steps {
                sh """
                docker rmi ${params.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${params.ECR_REPO_NAME}:${BUILD_NUMBER}
                docker rmi ${params.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${params.ECR_REPO_NAME}:latest
                docker images
                """
            }
        }
    }
}
