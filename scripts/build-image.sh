# Prompt for the database service name
read -p "Which service? (api-gateway, auth): " _service
_service=$(echo "$_service" | tr '[:upper:]' '[:lower:]')

_tag="ultimate-nest-$_service:beta"
_directory="./apps/$_service"
_args="--build-arg APP=$_service"

_command="docker build $_directory -t $_tag"
echo "RUN: $_command"
eval $_command