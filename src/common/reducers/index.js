const initialState={
	isShowPinDialog:false,
	isShowTransactionDialog:false
}
export const reducer=(state=initialState,payload)=>{
	const {type}=payload
	console.log(type)
	switch(type){
		case "CLOSE_TRANSACTION_DIALOG":
		 	return {...state,isShowTransactionDialog:false}
		case "OPEN_TRANSACTION_DIALOG":
			 return {...state,isShowTransactionDialog:true}
		case "OPEN_PIN_DIALOG":
			 return {...state,isShowPinDialog:true}
		case "CLOSE_PIN_DIALOG":
		 	return {...state,isShowPinDialog:false}
		default:
			return state;
	}
}