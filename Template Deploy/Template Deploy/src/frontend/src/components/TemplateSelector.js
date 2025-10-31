import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TemplateSelector.css';

/**
 * TemplateSelector Component
 * Allows users to select a team (client) and a list where templates will be added
 */
function TemplateSelector() {
  // State management
  const [teams, setTeams] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [loading, setLoading] = useState(false);
  const [listsLoading, setListsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch teams on component mount
  useEffect(() => {
    fetchTeams();
  }, []);

  /**
   * Fetch all teams (workspaces/clients) from ClickUp
   */
  const fetchTeams = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/clickup/teams');

      if (response.data.success) {
        setTeams(response.data.data);
      } else {
        setError('Failed to fetch teams from ClickUp');
      }
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.response?.data?.error || 'Failed to connect to server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch all lists for the selected team
   */
  const fetchListsForTeam = async (teamId) => {
    setListsLoading(true);
    setError(null);
    setLists([]);
    setSelectedList('');

    try {
      const response = await axios.get(`/api/clickup/teams/${teamId}/lists`);

      if (response.data.success) {
        setLists(response.data.data);
      } else {
        setError('Failed to fetch lists from ClickUp');
      }
    } catch (err) {
      console.error('Error fetching lists:', err);
      setError(err.response?.data?.error || 'Failed to fetch lists');
    } finally {
      setListsLoading(false);
    }
  };

  /**
   * Handle team selection change
   */
  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);

    if (teamId) {
      fetchListsForTeam(teamId);
    } else {
      setLists([]);
      setSelectedList('');
    }
  };

  /**
   * Handle list selection change
   */
  const handleListChange = (e) => {
    setSelectedList(e.target.value);
  };

  /**
   * Handle form submission (process templates button click)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTeam || !selectedList) {
      setError('Please select both a team and a list');
      return;
    }

    setSuccess(null);
    setError(null);

    // TODO: Implement template processing logic
    setSuccess(`Ready to process templates for list: ${lists.find(l => l.id === selectedList)?.name}`);
  };

  /**
   * Group lists by space and folder for better organization
   */
  const getGroupedLists = () => {
    const grouped = {};

    lists.forEach(list => {
      const key = `${list.spaceName}${list.folderName ? ` > ${list.folderName}` : ''}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(list);
    });

    return grouped;
  };

  return (
    <div className="template-selector">
      <div className="card">
        <h2>Select Template Destination</h2>
        <p className="description">
          Choose the team (workspace) and list where you want to process templates.
        </p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Team Selection */}
          <div className="form-group">
            <label htmlFor="team-select" className="form-label">
              1. Select Team (Client/Workspace)
            </label>
            {loading ? (
              <p className="loading-text">
                <span className="loading"></span> Loading teams...
              </p>
            ) : (
              <select
                id="team-select"
                className="form-select"
                value={selectedTeam}
                onChange={handleTeamChange}
                disabled={loading || teams.length === 0}
              >
                <option value="">-- Select a Team --</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            )}
            {!loading && teams.length === 0 && (
              <p className="helper-text error">
                No teams found. Please check your ClickUp API token.
              </p>
            )}
          </div>

          {/* List Selection */}
          <div className="form-group">
            <label htmlFor="list-select" className="form-label">
              2. Select Destination List
            </label>
            {listsLoading ? (
              <p className="loading-text">
                <span className="loading"></span> Loading lists...
              </p>
            ) : (
              <select
                id="list-select"
                className="form-select"
                value={selectedList}
                onChange={handleListChange}
                disabled={!selectedTeam || listsLoading || lists.length === 0}
              >
                <option value="">-- Select a List --</option>
                {Object.entries(getGroupedLists()).map(([groupName, groupLists]) => (
                  <optgroup key={groupName} label={groupName}>
                    {groupLists.map(list => (
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}
            {selectedTeam && !listsLoading && lists.length === 0 && (
              <p className="helper-text">
                No lists found in this team.
              </p>
            )}
            {!selectedTeam && (
              <p className="helper-text">
                Please select a team first.
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedTeam || !selectedList || loading || listsLoading}
            >
              {loading || listsLoading ? (
                <>
                  <span className="loading"></span> Loading...
                </>
              ) : (
                'Process Templates'
              )}
            </button>
          </div>
        </form>

        {/* Selected Information Display */}
        {selectedTeam && selectedList && (
          <div className="selection-summary">
            <h3>Selected Configuration</h3>
            <div className="summary-item">
              <strong>Team:</strong> {teams.find(t => t.id === selectedTeam)?.name}
            </div>
            <div className="summary-item">
              <strong>List:</strong> {lists.find(l => l.id === selectedList)?.name}
            </div>
            <div className="summary-item">
              <strong>Location:</strong> {lists.find(l => l.id === selectedList)?.spaceName}
              {lists.find(l => l.id === selectedList)?.folderName &&
                ` > ${lists.find(l => l.id === selectedList)?.folderName}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateSelector;
