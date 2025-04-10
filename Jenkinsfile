pipeline {
    agent any

    stages {
        stage('Deploy To Kubernetes') {
            steps {
                withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'prasha_mvp-cluster', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', serverUrl: 'https://DC4C4D274814CCA1F3A022D1130F98DF.gr7.us-east-1.eks.amazonaws.com']]) {
                    sh "kubectl apply -f deployment-service.yml"
                    
                }
            }
        }
        
        stage('verify Deployment') {
            steps {
                withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'prasha_mvp-cluster', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', serverUrl: 'https://DC4C4D274814CCA1F3A022D1130F98DF.gr7.us-east-1.eks.amazonaws.com']]) {
                    sh "kubectl get svc -n webapps"
                }
            }
        }
    }
}