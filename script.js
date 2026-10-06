document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const wordCountBadge = document.getElementById('wordCountBadge');
    const wordCountText = document.getElementById('wordCountText');
    const ratioSlider = document.getElementById('ratioSlider');
    const ratioDisplay = document.getElementById('ratioDisplay');
    const btnClear = document.getElementById('btnClear');
    const btnCopy = document.getElementById('btnCopy');
    const outputText = document.getElementById('outputText');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    const MAX_WORDS = 500;

    // Real-time Word Counter
    inputText.addEventListener('input', updateWordCount);

    function updateWordCount() {
        const text = inputText.value.trim();
        const words = text ? text.split(/\s+/).filter(w => w.length > 0) : [];
        const count = words.length;

        wordCountText.textContent = `${count} / ${MAX_WORDS} kata`;

        // Warning state if exceeded 500 words
        if (count > MAX_WORDS) {
            wordCountBadge.classList.add('exceeded');
        } else {
            wordCountBadge.classList.remove('exceeded');
        }
    }

    // Slider ratio display update
    ratioSlider.addEventListener('input', () => {
        ratioDisplay.textContent = `${ratioSlider.value}%`;
    });

    // Reset button action
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            inputText.value = '';
            updateWordCount();
        });
    }

    // Copy output button action
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const content = outputText.value.trim();
            if (!content) {
                showToast('Hasil ringkasan masih kosong!');
                return;
            }
            navigator.clipboard.writeText(content).then(() => {
                showToast('Teks berhasil disalin ke clipboard!');
            });
        });
    }

    // Toast notification helper
    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2500);
    }
});
