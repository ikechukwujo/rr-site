// const http = require('http')
// const fs = require('fs')




// const server = http.createServer((req, res)=>{
//     res.setHeader('content-type', 'text/html')

//     let path = './views'
//     switch (req.url) {
//         case '/':
//             path += '/index.ejs'
//             break;
//         case '/about':
//             path += '/about.ejs'
//             break;
//         case 'about-us':
//             res.setHeader('Location', '/about');
//             res.end();
//             break;
//         default:
//             path += '/404.ejs'
//             break;
//     }
//     fs.readFile(path, (err, data)=>{

//         if(err){
//             console.log(err);
//             res.end();
//         }else {
//             res.write(data);
//             res.end();

//         }
//         console.log(path )
        
//     })
    
// })

// server.listen(3001, 'localhost', ()=>{
//     console.log('server listening on port 3001')
// })

// const bcrypt = require('bcrypt')



// const plainPassword = 'testpassword123';

// async function hashed(str) {
//     const salt = await bcrypt.genSalt()
//     const crypt = await bcrypt.hash(str, salt)
//     return crypt
// }
// // (async () => {
// //     console.log(await hashed(plainPassword))
// // })()





// bcrypt.compare(plainPassword, await hashed(plainPassword), (err, res) => {
//     if (err) {
//         console.error("Error:", err);
//     } else {
//         console.log("Comparison Result:", res);  // Should be true if they match
//     }
// });


const bcrypt = require('bcrypt');

async function comparePasswords(plainPassword) {
  try {
    // Hash the plain password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Compare the plain password with the hashed password
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    
    if (result) {
      console.log('Password matches!');
    } else {
      console.log('Password does not match.');
    }
  } catch (err) {
    console.error(err);
  }
}

// Example usage
comparePasswords('yourPlainPassword');




