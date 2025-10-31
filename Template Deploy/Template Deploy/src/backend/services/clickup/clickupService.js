/**
 * ClickUp API Service
 * Handles all interactions with the ClickUp API
 */

const axios = require('axios');

class ClickUpService {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = 'https://api.clickup.com/api/v2';

    // Create axios instance with default config
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Get authorized user information
   * @returns {Promise<Object>} User information
   */
  async getAuthorizedUser() {
    try {
      const response = await this.client.get('/user');
      return response.data.user;
    } catch (error) {
      throw this._handleError(error, 'Failed to get user information');
    }
  }

  /**
   * Get all teams (workspaces) accessible to the user
   * In ClickUp, teams are also called workspaces or clients
   * @returns {Promise<Array>} List of teams
   */
  async getTeams() {
    try {
      const response = await this.client.get('/team');
      return response.data.teams;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch teams');
    }
  }

  /**
   * Get all spaces for a specific team
   * @param {string} teamId - The team ID
   * @returns {Promise<Array>} List of spaces
   */
  async getSpaces(teamId) {
    try {
      const response = await this.client.get(`/team/${teamId}/space?archived=false`);
      return response.data.spaces;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch spaces');
    }
  }

  /**
   * Get all folders for a specific space
   * @param {string} spaceId - The space ID
   * @returns {Promise<Array>} List of folders
   */
  async getFolders(spaceId) {
    try {
      const response = await this.client.get(`/space/${spaceId}/folder?archived=false`);
      return response.data.folders;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch folders');
    }
  }

  /**
   * Get all lists for a specific folder
   * @param {string} folderId - The folder ID
   * @returns {Promise<Array>} List of lists
   */
  async getFolderLists(folderId) {
    try {
      const response = await this.client.get(`/folder/${folderId}/list?archived=false`);
      return response.data.lists;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch folder lists');
    }
  }

  /**
   * Get all lists for a specific space (folderless lists)
   * @param {string} spaceId - The space ID
   * @returns {Promise<Array>} List of lists
   */
  async getSpaceLists(spaceId) {
    try {
      const response = await this.client.get(`/space/${spaceId}/list?archived=false`);
      return response.data.lists;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch space lists');
    }
  }

  /**
   * Get all lists accessible to the user across all teams
   * This is a convenience method that aggregates lists from all spaces
   * @param {string} teamId - The team ID
   * @returns {Promise<Array>} List of all lists with metadata
   */
  async getAllListsForTeam(teamId) {
    try {
      const allLists = [];

      // Get all spaces for the team
      const spaces = await this.getSpaces(teamId);

      for (const space of spaces) {
        // Get folderless lists in the space
        const spaceLists = await this.getSpaceLists(space.id);
        spaceLists.forEach(list => {
          allLists.push({
            ...list,
            spaceName: space.name,
            spaceId: space.id,
            folderName: null,
            folderId: null
          });
        });

        // Get all folders in the space
        const folders = await this.getFolders(space.id);

        for (const folder of folders) {
          // Get lists in each folder
          const folderLists = await this.getFolderLists(folder.id);
          folderLists.forEach(list => {
            allLists.push({
              ...list,
              spaceName: space.name,
              spaceId: space.id,
              folderName: folder.name,
              folderId: folder.id
            });
          });
        }
      }

      return allLists;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch all lists for team');
    }
  }

  /**
   * Create a task in a specific list
   * @param {string} listId - The list ID
   * @param {Object} taskData - Task data (name, description, etc.)
   * @returns {Promise<Object>} Created task
   */
  async createTask(listId, taskData) {
    try {
      const response = await this.client.post(`/list/${listId}/task`, taskData);
      return response.data;
    } catch (error) {
      throw this._handleError(error, 'Failed to create task');
    }
  }

  /**
   * Handle API errors consistently
   * @private
   * @param {Error} error - The error object
   * @param {string} message - Custom error message
   * @returns {Error} Formatted error
   */
  _handleError(error, message) {
    if (error.response) {
      // ClickUp API returned an error response
      const status = error.response.status;
      const data = error.response.data;

      console.error(`ClickUp API Error (${status}):`, data);

      return new Error(`${message}: ${data.err || data.error || 'Unknown error'}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response from ClickUp API:', error.request);
      return new Error(`${message}: No response from ClickUp API`);
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return new Error(`${message}: ${error.message}`);
    }
  }
}

module.exports = ClickUpService;
