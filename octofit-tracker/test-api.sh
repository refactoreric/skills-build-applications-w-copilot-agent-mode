#!/bin/bash

# OctoFit Tracker API Testing Script
# Tests all API endpoints for both Codespaces and localhost environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Determine API base URL
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://$CODESPACE_NAME-8000.app.github.dev"
else
    BASE_URL="http://localhost:8000"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}OctoFit Tracker - API Test Suite${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${YELLOW}API Base URL: $BASE_URL${NC}"
echo ""

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    
    echo -e "${BLUE}Testing: $description${NC}"
    echo -e "  Endpoint: ${YELLOW}$method $endpoint${NC}"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$endpoint" -H "Content-Type: application/json")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo -e "  ${GREEN}✓ Status: $http_code${NC}"
        echo "  Response:"
        echo "$body" | jq . 2>/dev/null || echo "$body" | head -n 3
    else
        echo -e "  ${RED}✗ Status: $http_code${NC}"
        echo "  Response: $body"
    fi
    echo ""
}

# Test all endpoints
echo -e "${YELLOW}=== System Endpoints ===${NC}"
test_endpoint "GET" "/api/health" "Health Check"

echo -e "${YELLOW}=== User Endpoints ===${NC}"
test_endpoint "GET" "/api/users" "Get All Users"

echo -e "${YELLOW}=== Team Endpoints ===${NC}"
test_endpoint "GET" "/api/teams" "Get All Teams"

echo -e "${YELLOW}=== Activity Endpoints ===${NC}"
test_endpoint "GET" "/api/activities" "Get All Activities"

echo -e "${YELLOW}=== Workout Endpoints ===${NC}"
test_endpoint "GET" "/api/workouts" "Get All Workouts"

echo -e "${YELLOW}=== Leaderboard Endpoints ===${NC}"
test_endpoint "GET" "/api/leaderboard" "Get Leaderboard"

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ API Test Suite Complete${NC}"
echo -e "${BLUE}========================================${NC}"
