// Auto-prefill model field in API playground based on page URL
(function () {
  var MODEL_MAP = {
    'veo-3-1-fast-text-to-video': 'google/veo-3.1-fast/text-to-video',
    'veo-3-1-fast-image-to-video': 'google/veo-3.1-fast/image-to-video',
    'veo-3-1-fast-reference-to-video': 'google/veo-3.1-fast/reference-to-video',
    'veo-3-1-quality-text-to-video': 'google/veo-3.1-quality/text-to-video',
    'wan-2-2-super-image-to-video': 'alibaba/wan-2.2-super/image-to-video',
    'nano-banana-pro-text-to-image': 'google/nano-banana-pro/text-to-image',
    'nano-banana-pro-edit-image': 'google/nano-banana-pro/edit-image',
    'nano-banana-pro': 'google/nano-banana-pro/text-to-image',
    'nano-banana-edit-image': 'google/nano-banana/edit-image',
    'nano-banana': 'google/nano-banana'
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
