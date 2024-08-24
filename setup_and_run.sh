#!/bin/bash

set -e

# Define directories
VENV_DIR="backend/myenv"
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

# 1. Create and activate a virtual environment
echo "Setting up virtual environment..."
python3 -m venv $VENV_DIR
source $VENV_DIR/bin/activate

# 2. Install Python dependencies
echo "Installing Python dependencies..."
pip install -r $BACKEND_DIR/requirements.txt

# 3. Setup Django project and app
echo "Setting up Django project..."
cd $BACKEND_DIR

# Make initial migrations
python manage.py makemigrations
python manage.py migrate

# Load initial data
echo "Loading initial data into the database..."
python manage.py loaddata recipes/fixtures/recipes.json

# Create a superuser (prompt the user for credentials)
# echo "Creating a Django superuser account..."
# python manage.py createsuperuser

# 4. Setup frontend
echo "Setting up React frontend..."
cd ../$FRONTEND_DIR/

# Install Node.js dependencies
npm install

# 5. Run the Django development server
echo "Starting Django development server..."
cd ../$BACKEND_DIR
python manage.py runserver &

# 6. Run the React development server
echo "Starting React development server..."
cd ../$FRONTEND_DIR
npm start
