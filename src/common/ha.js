import axios from 'axios'
export const sendSMS=()=>{
	//write this code in your .gs file
//Your authentication key
// var authKey = "342140AFxVsyjT8Koz5f65cbf6P1";

// //Multiple mobiles numbers separated by comma
// var mobileNumber = "916205280071,919159625278";

// //Sender ID,While using route4 sender id should be 6 characters long.
// var senderId = "ABCHJK";

// //Your message to send, Add URL encoding here.
// var message = "Test message";

// //Define route
// var route = "default";


// var payload = {
//         "authkey": authKey,
//         'mobiles' : mobileNumber,
//         'message' : message,
//         'sender' : senderId,
//         'route' : route
// };

// const url="http://mpromo.zerobugz.com/api/sendhttp.php?authkey=342140AFxVsyjT8Koz5f65cbf6P1&mobiles=+916205280071&message=message&sender=ABCHJK&route=4"
// axios.get(url)
// .then(res=>console.log(res)).catch(err=>console.log(err));

const apiKey = "apikey=" + "Qp19CgnvaNQ-0VW6aKCR8O2at5s1BuZAYRHBuHcNYw";
			const message = "&message=" + "This is your message";
			const sender = "&sender=" + "TXTLCL";
			const numbers = "&numbers=" + "916205280071";
			const data = apiKey + numbers + message + sender;
		const url="https://api.textlocal.in/send/?"+data
		// axios.get(url).then(res=>console.log(res)).catch(err=>console.log(err))
}