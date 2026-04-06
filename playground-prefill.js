// Auto-prefill model field in API playground based on page URL
(function () {
  var MODEL_MAP = {
    // --- Existing ---
    'veo-3-1-fast-text-to-video': 'google/veo-3.1-fast/text-to-video',
    'veo-3-1-fast-image-to-video': 'google/veo-3.1-fast/image-to-video',
    'veo-3-1-fast-reference-to-video': 'google/veo-3.1-fast/reference-to-video',
    'veo-3-1-quality-text-to-video': 'google/veo-3.1-quality/text-to-video',
    'wan-2-2-super-image-to-video': 'alibaba/wan-2.2-super/image-to-video',
    'nano-banana-pro-text-to-image': 'google/nano-banana-pro/text-to-image',
    'nano-banana-pro-edit-image': 'google/nano-banana-pro/edit-image',
    'nano-banana-pro': 'google/nano-banana-pro/text-to-image',
    'nano-banana-edit-image': 'google/nano-banana/edit-image',
    'nano-banana': 'google/nano-banana',

    // --- Sora ---
    'sora-2-text-to-video': 'openai/sora-2/text-to-video',
    'sora-2-image-to-video': 'openai/sora-2/image-to-video',
    'sora-2-pro-text-to-video': 'openai/sora-2-pro/text-to-video',
    'sora-2-pro-image-to-video': 'openai/sora-2-pro/image-to-video',

    // --- Gen (Runway) ---
    'gen-4-5-text-to-video': 'runway/gen-4.5/text-to-video',
    'gen-4-5-image-to-video': 'runway/gen-4.5/image-to-video',
    'gen-4-image-to-video': 'runway/gen-4/image-to-video',
    'gen-4-turbo-image-to-video': 'runway/gen-4-turbo/image-to-video',

    // --- Kling ---
    'kling-3-0-pro-text-to-video': 'kling/kling-3.0-pro/text-to-video',
    'kling-3-0-pro-image-to-video': 'kling/kling-3.0-pro/image-to-video',
    'kling-3-0-pro-start-end-frame-to-video': 'kling/kling-3.0-pro/start-end-frame-to-video',
    'kling-3-0-standard-text-to-video': 'kling/kling-3.0-standard/text-to-video',
    'kling-3-0-standard-image-to-video': 'kling/kling-3.0-standard/image-to-video',
    'kling-3-0-standard-start-end-frame-to-video': 'kling/kling-3.0-standard/start-end-frame-to-video',
    'kling-3-0-pro-motion-control': 'kling/kling-3.0-pro/motion-control',
    'kling-3-0-standard-motion-control': 'kling/kling-3.0-standard/motion-control',
    'kling-2-6-pro-text-to-video': 'kling/kling-2.6-pro/text-to-video',
    'kling-2-6-pro-image-to-video': 'kling/kling-2.6-pro/image-to-video',
    'kling-2-6-i2v-image-to-video': 'kling/kling-2.6-i2v/image-to-video',

    // --- Wan ---
    'wan-2-6-flash-image-to-video': 'alibaba/wan-2.6-flash/image-to-video',

    // --- GPT Image ---
    'gpt-image-1-5-text-to-image': 'openai/gpt-image-1.5/text-to-image',
    'gpt-image-1-5-edit-image': 'openai/gpt-image-1.5/edit-image',
    'gpt-image-1-mini-text-to-image': 'openai/gpt-image-1-mini/text-to-image',
    'gpt-image-1-mini-edit-image': 'openai/gpt-image-1-mini/edit-image',

    // --- Seedream ---
    'seedream-5-text-to-image': 'seedance/seedream-5/text-to-image',
    'seedream-5-edit-image': 'seedance/seedream-5/edit-image',

    // --- Gen 4 Image (Runway) ---
    'gen-4-image-text-to-image': 'runway/gen-4-image/text-to-image',
    'gen-4-image-edit-image': 'runway/gen-4-image/edit-image',
    'gen-4-turbo-image-edit-image': 'runway/gen-4-turbo-image/edit-image'
  };

  function getModelSlug() {
    var path = window.location.pathname;
    var keys = Object.keys(MODEL_MAP);
    for (var i = 0; i < keys.length; i++) {
      if (path.indexOf(keys[i]) !== -1) return MODEL_MAP[keys[i]];
    }
    return null;
  }

  function setInputValue(input, value) {
    var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function prefillModel() {
    var slug = getModelSlug();
    if (!slug) return;

    var inputs = document.querySelectorAll('input[placeholder="enter model"]');
    inputs.forEach(function (input) {
      if (!input.value) {
        setInputValue(input, slug);
      }
    });
  }

  var observer = new MutationObserver(function () {
    prefillModel();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', prefillModel);
})();
