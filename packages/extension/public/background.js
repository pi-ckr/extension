chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'LOGIN') {
		// 사용자 정보와 액세스 토큰을 함께 저장
		chrome.storage.local.set({
			userInfo: message.username,
			accessToken: message.accessToken,
		}, () => {
			console.log('User info and token saved:', message.username, message.accessToken);
		});
	}
});
