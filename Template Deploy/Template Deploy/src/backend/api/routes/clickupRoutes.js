/**
 * ClickUp API Routes
 * Defines all API endpoints for ClickUp operations
 */

const express = require('express');
const router = express.Router();
const ClickUpService = require('../../services/clickup/clickupService');

/**
 * GET /api/clickup/user
 * Get authorized user information
 */
router.get('/user', async (req, res) => {
  try {
    const clickup = new ClickUpService(process.env.CLICKUP_API_TOKEN);
    const user = await clickup.getAuthorizedUser();

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/clickup/teams
 * Get all teams (workspaces/clients) accessible to the user
 */
router.get('/teams', async (req, res) => {
  try {
    const clickup = new ClickUpService(process.env.CLICKUP_API_TOKEN);
    const teams = await clickup.getTeams();

    res.json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/clickup/teams/:teamId/spaces
 * Get all spaces for a specific team
 */
router.get('/teams/:teamId/spaces', async (req, res) => {
  try {
    const { teamId } = req.params;
    const clickup = new ClickUpService(process.env.CLICKUP_API_TOKEN);
    const spaces = await clickup.getSpaces(teamId);

    res.json({
      success: true,
      data: spaces
    });
  } catch (error) {
    console.error('Error fetching spaces:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/clickup/teams/:teamId/lists
 * Get all lists for a specific team (aggregated from all spaces and folders)
 */
router.get('/teams/:teamId/lists', async (req, res) => {
  try {
    const { teamId } = req.params;
    const clickup = new ClickUpService(process.env.CLICKUP_API_TOKEN);
    const lists = await clickup.getAllListsForTeam(teamId);

    res.json({
      success: true,
      data: lists
    });
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/clickup/spaces/:spaceId/lists
 * Get all lists for a specific space (including folderless lists)
 */
router.get('/spaces/:spaceId/lists', async (req, res) => {
  try {
    const { spaceId } = req.params;
    const clickup = new ClickUpService(process.env.CLICKUP_API_TOKEN);
    const lists = await clickup.getSpaceLists(spaceId);

    res.json({
      success: true,
      data: lists
    });
  } catch (error) {
    console.error('Error fetching space lists:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/clickup/lists/:listId/tasks
 * Create a task in a specific list
 */
router.post('/lists/:listId/tasks', async (req, res) => {
  try {
    const { listId } = req.params;
    const taskData = req.body;

    const clickup = new ClickUpService(process.env.CLICKUP_API_TOKEN);
    const task = await clickup.createTask(listId, taskData);

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
