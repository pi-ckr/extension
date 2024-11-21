window.onload = () => {
	function injectStyles() {
		if (!document.getElementById('pickr-styles')) {
			const style = document.createElement('style');
			style.id = 'pickr-styles';
			style.textContent = `
        @keyframes popin {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .floating-icon {
          animation: popin 0.3s ease-out;
          position: absolute;
          z-index: 9999;
          cursor: pointer;
          width: 30px;
          height: 30px;
          background-size: cover;
          border-radius: 5px;
        }

        .word-card {
          animation: popin 0.2s ease-out;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .word-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .close-button {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border: none;
          background: none;
          font-size: 18px;
          color: #666;
          padding: 0;
        }

        .close-button:hover {
          color: #333;
        }

        .selected-text {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 12px;
          word-break: break-word;
          animation: slideIn 0.3s ease-out;
        }

        .definitions {
          color: #444;
          font-size: 14px;
          max-height: 120px;
          overflow-y: auto;
          margin-bottom: 15px;
        }

        .definition-item {
          margin-bottom: 8px;
          line-height: 1.4;
          animation: slideIn 0.3s ease-out;
          animation-fill-mode: both;
        }

        .definition-item:nth-child(2) { animation-delay: 0.1s; }
        .definition-item:nth-child(3) { animation-delay: 0.2s; }
        .definition-item:nth-child(4) { animation-delay: 0.3s; }

        .loading {
          color: #666;
          font-style: italic;
        }

        .pick-button {
          background-color: #4E78F6;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          float: right;
          transition: background-color 0.2s ease;
        }

        .pick-button:hover {
          background-color: #3d66e5;
        }

        .word-card-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
        }
      `;
			document.head.appendChild(style);
		}
	}

	const getIconPosition = () => {
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
			const range = selection.getRangeAt(0);

			if (selection.focusNode) {
				const isBackward = selection.anchorNode === selection.focusNode
					? selection.anchorOffset > selection.focusOffset
					: selection.anchorNode?.compareDocumentPosition(selection.focusNode) === Node.DOCUMENT_POSITION_PRECEDING;

				const rect = range.getClientRects()[isBackward ? 0 : range.getClientRects().length - 1];

				return {
					x: isBackward ? rect.left - 30 : rect.left + rect.width + 4,
					y: isBackward ? rect.top - 30 : rect.top + 10,
				};
			}
		}
		return { x: 0, y: 0 };
	};

	async function fetchDefinitions(text) {
		try {
			const response = await fetch(`https://pickr.apne2a.algorix.cloud/api/words/search?word=${ text }`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching definitions:', error);
			return { error: 'Failed to fetch definitions' };
		}
	}

	function createWordCard(selectedText, position) {
		const wordCard = document.createElement('div');
		wordCard.id = 'word-card';
		wordCard.className = 'word-card';
		wordCard.style.position = 'fixed';
		wordCard.style.zIndex = '2147483647';
		wordCard.style.width = '400px'; // 너비 증가
		wordCard.style.backgroundColor = 'white';
		wordCard.style.border = 'none'; // 테두리 제거
		wordCard.style.borderRadius = '16px'; // 모서리 더 둥글게
		// 중앙 정렬을 위한 위치 계산
		wordCard.style.left = '50%';
		wordCard.style.top = '50%';
		wordCard.style.transform = 'translate(-50%, -50%)';
		wordCard.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.1)'; // 그림자 추가

		const header = document.createElement('div');
		header.className = 'word-card-header';
		header.style.borderBottom = '1px solid #F0F0F0';
		header.style.padding = '16px';

		const title = document.createElement('h2');
		title.style.fontSize = '20px';
		title.style.fontWeight = 'bold';
		title.textContent = selectedText;

		const closeButton = document.createElement('button');
		closeButton.className = 'close-button';
		closeButton.innerHTML = '×';
		closeButton.onclick = () => wordCard.remove();
		closeButton.style.fontSize = '24px';
		closeButton.style.color = '#999';

		const selectedTextElement = document.createElement('div');
		selectedTextElement.className = 'selected-text';
		selectedTextElement.style.padding = '24px';
		selectedTextElement.style.fontSize = '16px';
		selectedTextElement.style.color = '#666';

		const definitionsContainer = document.createElement('div');
		definitionsContainer.className = 'definitions';
		definitionsContainer.style.padding = '0 24px';
		definitionsContainer.style.display = 'flex';
		definitionsContainer.style.alignItems = 'center';
		definitionsContainer.style.gap = '6px';
		definitionsContainer.innerHTML = '<div class="loading">Loading definitions...</div>';

		const footer = document.createElement('div');
		footer.className = 'word-card-footer';
		footer.style.padding = '16px 24px';
		footer.style.display = 'flex';
		footer.style.justifyContent = 'flex-end';

		const pickButton = document.createElement('button');
		pickButton.className = 'pick-button';
		pickButton.textContent = '픽하기';
		pickButton.style.backgroundColor = '#4E78F6';
		pickButton.style.color = 'white';
		pickButton.style.padding = '8px 24px';
		pickButton.style.borderRadius = '8px';
		pickButton.style.border = 'none';
		pickButton.style.fontSize = '16px';
		pickButton.style.fontWeight = '500';
		pickButton.style.cursor = 'pointer';

		pickButton.onmouseover = () => {
			pickButton.style.backgroundColor = '#3D66E5';
		};
		pickButton.onmouseout = () => {
			pickButton.style.backgroundColor = '#4E78F6';
		};

		pickButton.onclick = async () => {
			try {
				// chrome.storage.local에서 accessToken 가져오기
				const result = await new Promise((resolve) => {
					chrome.storage.local.get([ 'accessToken' ], resolve);
				});

				if (result.accessToken) {

					// 픽하기 API 요청
					const response = await fetch('https://pickr.apne2a.algorix.cloud/api/words/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${ result.accessToken }`,
						},
						body: JSON.stringify({
							word: selectedText,
							meanings: Array.from(document.querySelectorAll('.definition-item'))
								.map(item => item.textContent)
								.filter(text => text && !text.startsWith('Error:')),
						}),
					});

					if (response.ok) {
						// 성공 메시지 표시
						const successMessage = document.createElement('div');
						successMessage.style.position = 'fixed';
						successMessage.style.left = '50%';
						successMessage.style.top = '20px';
						successMessage.style.transform = 'translateX(-50%)';
						successMessage.style.backgroundColor = '#4CAF50';
						successMessage.style.color = 'white';
						successMessage.style.padding = '10px 20px';
						successMessage.style.borderRadius = '4px';
						successMessage.style.zIndex = '2147483648';
						successMessage.textContent = '단어가 성공적으로 저장되었습니다';
						document.body.appendChild(successMessage);

						// 워드카드 제거
						wordCard.remove();

						// 3초 후 성공 메시지 제거
						setTimeout(() => {
							successMessage.style.opacity = '0';
							successMessage.style.transition = 'opacity 0.5s ease';
							setTimeout(() => successMessage.remove(), 500);
						}, 3000);
					} else {
						throw new Error('API 요청이 실패했습니다');
					}
				} else {
					console.log('No accessToken found');
					alert('로그인이 필요합니다');
				}
			} catch (error) {
				console.error('Error during pick:', error);
				alert('단어 저장에 실패했습니다');
			}
		};

		header.appendChild(title);
		header.appendChild(closeButton);
		wordCard.appendChild(header);
		wordCard.appendChild(selectedTextElement);
		wordCard.appendChild(definitionsContainer);
		footer.appendChild(pickButton);
		wordCard.appendChild(footer);

		// Fetch and display definitions with staggered animation
		fetchDefinitions(selectedText).then(data => {
			if (data.error) {
				definitionsContainer.innerHTML = `<div class="definition-item">Error: ${ data.error }</div>`;
			} else {
				definitionsContainer.innerHTML = Array.isArray(data.meanings)
					? data.meanings.map(def => `<div class="definition-item">${ def }</div>`).join('')
					: '<div class="definition-item">No definitions found</div>';
			}
		});

		return wordCard;
	}

	function createFloatingIcon(selectedText) {
		const existingIcon = document.getElementById('floating-icon');
		if (existingIcon) {
			existingIcon.remove();
		}

		injectStyles();

		const iconPosition = getIconPosition();

		const floatingIcon = document.createElement('div');
		floatingIcon.id = 'floating-icon';
		floatingIcon.className = 'floating-icon';
		floatingIcon.style.left = `${ iconPosition.x }px`;
		floatingIcon.style.top = `${ iconPosition.y }px`;
		floatingIcon.style.backgroundImage = `url("${ chrome.runtime.getURL('icons/icon128.png') }")`;
		floatingIcon.style.position = 'fixed';
		floatingIcon.style.zIndex = '2147483647';

		floatingIcon.addEventListener('click', function () {
			const wordCard = createWordCard(selectedText, iconPosition);
			document.body.appendChild(wordCard);
			floatingIcon.remove();
		});

		document.addEventListener('scroll', function () {
			floatingIcon.remove();
		});

		document.body.appendChild(floatingIcon);
	}

	document.addEventListener('mouseup', function () {
		setTimeout(() => {
			const selection = window.getSelection();
			const selectedText = selection.toString().trim();

			if (selectedText.length > 0) {
				createFloatingIcon(selectedText);
			}
		}, 0);
	});

	document.addEventListener('mousedown', function (e) {
		const floatingIcon = document.getElementById('floating-icon');
		const wordCard = document.getElementById('word-card');

		if (floatingIcon && !floatingIcon.contains(e.target)) {
			floatingIcon.remove();
		}

		if (wordCard && !wordCard.contains(e.target)) {
			wordCard.remove();
		}
	});

	document.addEventListener('pickr-login', async (e) => {
		const { username, accessToken } = e.detail;
		console.log('Received login event:', username, accessToken);
		// accessToken도 함께 저장
		await chrome.runtime.sendMessage({
			type: 'LOGIN',
			username,
			accessToken,
		});
	});
};
