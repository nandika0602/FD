var client;

init();

async function init() {
  client = await app.initialized();
  const ticketData = await client.data.get('ticket');
  document.getElementById('button').addEventListener('click',click)
  // client.events.on("ticket.addNote", eventCallback);
}

  // function eventCallback(event) {
  //   event.helper.done()
  //   console.log('heyy');
  //   var event_data = event.helper.getData();
  //   console.log(event_data,event);
  //   console.log(event.type + " event occurred");
  // };

async function click () {
  try { 
      //iparams value
      const iparamsValue = await client.iparams.get();
      console.log(iparamsValue,'iparamsValue');
      const {ownerName, repoName, token} = iparamsValue

      //ticket data
      const ticketData = await client.data.get('ticket');
      const issueData = {
          title: ticketData.ticket.subject,
          body: ticketData.ticket.description_text,
          labels: [ticketData.ticket.type],
      };

        // const commentUrl = `https://api.github.com/repos/${ownerName}/${repoName}/issues/2/comments`
        //GET ISSUES FROM GITHUB
        const apiUrlget = `https://api.github.com/repos/${ownerName}/${repoName}/issues`;
        const responseGet = await fetch(apiUrlget, {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          }
        });
        const res = await responseGet.json()

        //LABEL_STATUS
        const stateData = {
          state: ticketData.ticket.status_label
        } 
        for (r of res) {
          if(issueData.title === r.title) {
            const issueNumber = r.number
            const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/issues/${issueNumber}`;
            const responseIssue = await fetch(apiUrl, {
              method: "PATCH",
              headers: {
                Authorization: `token ${token}`,
              },
              body: JSON.stringify(stateData),
            });
            if (responseIssue.ok) {
              console.log(`Issue #${issueNumber} ${stateData.state}!`);
            } else {
              const err = await responseIssue.json();
              console.error("Error:", err.message);
            }
          }
        }
        const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/issues`
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `token ${token}`,
          },
          body: JSON.stringify(issueData)
        })
        if (response.ok) {
            const resData = await response.json();
            showNotification('success', `Issue #${resData.number} created successfully`);
            console.log("Issue created!!!", resData.number);
        } else {
            const err = await response.json();
            showNotification('danger', `Error: ${err.message}`);
            console.error("Error:", err.message);
        }
        function showNotification (type, message) {
          client.interface.trigger('showNotify', {
            type,
            message
          });
        }
      } catch (error) {
      console.log(error);
    }
  }
