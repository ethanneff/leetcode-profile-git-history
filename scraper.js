(async () => {
  const axios = require("axios");
  const username = "ethanneff";
  const year = null;
  const url = "https://leetcode.com/graphql";
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      query: `query getUserProfile($username: String!, $year: Int) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        contributions {
          points
        }
        profile {
          reputation
          ranking
        }
        userCalendar(year: $year) {
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
          activeYears
        }
        submissionCalendar
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }`,
      variables: { username, year },
    }),
  };
  const {
    data: { data },
  } = await axios.request(url, config);
  const output = {
    solutions: {
      problems: `${data.matchedUser.submitStats.totalSubmissionNum[0].count}`,
      submissions: `${data.matchedUser.submitStats.totalSubmissionNum[0].submissions}`,
      easy: `${data.matchedUser.submitStats.totalSubmissionNum[1].count}/${data.allQuestionsCount[1].count}`,
      medium: `${data.matchedUser.submitStats.totalSubmissionNum[2].count}/${data.allQuestionsCount[2].count}`,
      hard: `${data.matchedUser.submitStats.totalSubmissionNum[3].count}/${data.allQuestionsCount[3].count}`,
    },
    contributions: {
      points: `${data.matchedUser.contributions.points}`,
      ranking: `${data.matchedUser.profile.ranking}`,
      reputation: `${data.matchedUser.profile.reputation}`,
    },
    username: username,
  };
  const formatted = JSON.stringify(output, null, 2);
  return console.log(formatted);
})();
