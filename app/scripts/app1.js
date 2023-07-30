var client;
init();
async function init() {
  client = await app.initialized();
//   console.log(client,'client');
//   console.log(client.iparams.get(),'client');
//   const val = await client.iparams.get()
//   console.log(val, 'client','val');
  document.getElementById('button').addEventListener('click',click)
}

async function click () {
  try { 
        const iparamsValue = await client.iparams.get();
        console.log(iparamsValue,'iparamsValue','client');
        const {ownerName, repoName, token} = iparamsValue
        // console.log(cc,'iparamsValue');
        // client.iparams.get().then((iparamsValue) => {
        //   console.log("Owner Name", iparamsValue);
        //   const {ownerName, repoName, token} = iparamsValue
        //   console.log(ownerName,'ownerName', repoName,'repoName', token,'token');
        // }).catch((error) => {
        //   console.error("err", error);
        // });
        const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/issues`
        const ticketData = await client.data.get('ticket');


        ////
        const issueData1 = {
          title: ticketData.ticket.subject,
          body: ticketData.ticket.description_text,
          labels: [ticketData.ticket.type],
          // state
        };
        const apiUrlget = `https://api.github.com/repos/${ownerName}/${repoName}/issues`;
        const responseget = await fetch(apiUrlget, {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
            // "Content-Type": "application/json",
          }
        });
        console.log(responseget,'responseget');
        // console.log( responseget.json(),'json val')
        // const jj = JSON.parse(responseget);
        // console.log(jj,'json val');
        let issueTitles
        if (responseget.ok) {
          const issues = await responseget.json();
          console.log(issues,'issues');
          issueTitles =  issues.map(issue => {
            console.log(issue.title,'issue','client');
            return issue.title
          });
          console.log("Issue Titles:", issueTitles,'client');
          for(i of issueTitles)
          if(i != issueData1.title) {
          getIssueTitles()
          async function getIssueTitles () {
            const response1 = await fetch(apiUrl, {
                method: "POST",
                headers: {
                  Authorization: `token ${token}`,
                },
                body: JSON.stringify(issueData1)
            })
            console.log(response1,'response1','client');
          }
        } else {
          console.log('however done!!!','client')
        }
      }
    } 
      catch (error) {
            console.log(error, 'error','client');
      }
}   








        
/////
//         console.log(ticketData,'ticketData','client');
//         const issueData = {
//           title: ticketData.ticket.subject,
//           body: ticketData.ticket.description_text,
//           labels: [ticketData.ticket.type],
//           state
//         };
//         const response = await fetch(apiUrl, {
//           method: "POST",
//           headers: {
//             Authorization: `token ${token}`,
//           },
//           body: JSON.stringify(issueData)
//         })
//         console.log(response,'response','client');
//         if (response.ok) {
//           console.log(response,'response','client');
//           const res = await response.json();
//           console.log(res,'response','client','block');
//           console.log("Issue created!!!",'client');
//         }
//         else {
//           const err = await response.json();
//           console.log(err,'err','client');
//           console.error("Error:", err.message,'client');
//         }   
//       } catch (error) {
//         console.log(error, 'error','client');
//   }
// }
// console.log('finished');