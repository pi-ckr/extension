chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'LOGIN') {
		// 받은 메시지를 처리하고 사용자 정보를 저장
		chrome.storage.local.set({ userInfo: message.username }, () => {
			console.log('User info saved:', message.username);
		});
	}
});