pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
    }
  
    stages {
         stage('Cleanup Workspace') {
            steps {
                // Clean up the workspace to ensure no conflicts with previous builds
                script {
                    sh '''
                        if [ -d "Front-End" ]; then rm -rf Front-End; fi
                    '''
                }
            }
        }
        
        stage('Checkout Frontend') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-auth', passwordVariable: 'GITHUB_TOKEN', usernameVariable: 'GITHUB_USERNAME')]) {
                    sh 'git clone https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Motaql-Social-media/Front-End.git'
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                script {
                    dir('Front-End') {
                        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                        sh 'docker build -t frontend-image .'
                        sh "docker tag frontend-image:latest ${DOCKERHUB_CREDENTIALS_USR}/frontend-image:latest"
                        echo 'pushing to hub....'
                        sh 'docker push ${DOCKERHUB_CREDENTIALS_USR}/frontend-image:latest'
                        sh 'docker logout'
                    }
                }
            }
        }
        
   stage('Deploy to Kubernetes') {
            steps {
                script {
                    withEnv(["KUBECONFIG=/var/lib/jenkins/.kube/config"]) {
                        dir('Front-End') {
                           sh 'kubectl delete deployment frontend-deployment'
                            sh 'kubectl apply -f frontend-depl.yaml --validate=false'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            script {
                echo 'Cleaning up Docker system...'
                // Remove all stopped containers
                sh 'docker container prune -f'
                // Remove all dangling images
                sh 'docker image prune -f'
                // Remove all unused volumes
                sh 'docker volume prune -f'
                // Remove all unused networks
                sh 'docker network prune -f'
                // Remove all unused Docker objects (containers, images, volumes, networks)
                sh 'docker system prune -a -f'
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
