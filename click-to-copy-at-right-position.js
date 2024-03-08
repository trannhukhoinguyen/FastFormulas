const positionFromTop = ref();
const positionFromLeft = ref();
const distanceFromTopAfterScroll = computed(() => {
    return positionFromTop.value - window.scrollY
});
const distanceFromLeftAfterScroll = computed(() => {
    return positionFromLeft.value - window.scrollX
});
document.addEventListener('click', function(event) {
    positionFromLeft.value = event.clientX + window.scrollX;
    positionFromTop.value = event.clientY + window.scrollY;
});

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text?.couponCode)
        .then(() => {
           message.success( {
            content: `Đã copy: ${text?.couponCode}`,
            style: {
              marginTop: `${distanceFromTopAfterScroll.value - 35}px`,
              marginLeft: `-${distanceFromLeftAfterScroll.value + 85}px`,
            },
          });
        })
        .catch(() => {
            message.error('Unable to copy text');
        });
};
