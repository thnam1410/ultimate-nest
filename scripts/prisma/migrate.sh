#!/bin/bash

# Prompt for the database service name
read -p "Which db? (auth, billing, ...): " _service
_service=$(echo "$_service" | tr '[:upper:]' '[:lower:]')

# Set schema variable
_schema="prisma-${_service}"

# Prompt for the migration type and convert to lowercase
read -p "Init(i) or Apply(a) or Generate(g)? (i/a/g) " migration_type
migration_type=$(echo "$migration_type" | tr '[:upper:]' '[:lower:]')

if [ "$migration_type" == "i" ]; then
  # If initiate migration, prompt for migration name
  read -p "Migration name? " _migration_name
  _migration_name=$(echo "$_migration_name" | tr '[:upper:]' '[:lower:]')
  echo "- Initiating migration..."

  # Run the command to initiate migration
	_command="pnpx prisma migrate dev --create-only --schema ./libs/orm/src/$_schema/schema.prisma --name=$_migration_name"
  echo $_command
	eval $_command
elif [ "$migration_type" == "a" ]; then
  echo "- Applying migration..."

  # Run the command to apply migration
	_command="pnpx prisma migrate dev --schema ./libs/orm/src/$_schema/schema.prisma"
	echo $_command
	eval $_command
elif [ "$migration_type" == "g" ]; then
  echo "- Generate migration..."

  # Run the command to apply migration
	_command="pnpx prisma generate --schema ./libs/orm/src/$_schema/schema.prisma"
	echo $_command
	eval $_command
else
  echo "Invalid option. Please use 'm' to apply migration or 'i' to initiate migration."
  exit 1
fi

echo "- Migration completed!"
