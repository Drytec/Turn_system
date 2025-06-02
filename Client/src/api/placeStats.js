import axios from 'axios';


export const getPlaceStats = async (id) => {
  const token = localStorage.getItem('token');

  try {
    const [avgRes, statsRes] = await Promise.all([
      fetch(`http://127.0.0.1:8000/api/avg_attendacy_time/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch(`http://127.0.0.1:8000/api/statistics/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ]);

    if (!avgRes.ok || !statsRes.ok) {
      throw new Error('Error en una de las respuestas');
    }

    const avgData = await avgRes.json();
    const statsData = await statsRes.json();

    return {
      averageTime: avgData.avg_attendacy_time,
      totalTurns: statsData.total_turns,
      attendedTurns: statsData.attended_turns,
      uniqueUsers: statsData.unique_users_attended,
      percentAttended: statsData.percent_attended
    };

  } catch (error) {
    console.error(error);
    throw error;
  }
};