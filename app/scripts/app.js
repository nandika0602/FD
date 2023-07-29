var client;

init();

async function init() {
  client = await app.initialized();
  document.getElementById('button').addEventListener('click',click)
}

async function click () {
  try { 
      //iparams value
      const iparamsValue = await client.iparams.get();
      console.log(iparamsValue,'iparamsValue','client');
      const {ownerName, repoName, token} = iparamsValue
      //ticket data
      const ticketData = await client.data.get('ticket');
      const issueData = {
          title: ticketData.ticket.subject,
          body: ticketData.ticket.description_text,
          labels: [ticketData.ticket.type],
      };
      const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/issues`
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(issueData)
      })
      if (response.ok) {
        console.log("Issue created!!!");
      } else {
        const err = await response.json();
        console.error("Error:", err.message);
      }   
    } catch (error) {
      console.log(error);
    }
}
