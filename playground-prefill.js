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

    // --- Kling Base (path-disambiguated to avoid kling-plus collision) ---
    'kling/kling-3-0-pro-text-to-video': 'kling/kling-3.0-pro/text-to-video',
    'kling/kling-3-0-pro-image-to-video': 'kling/kling-3.0-pro/image-to-video',
    'kling/kling-3-0-pro-start-end-frame-to-video': 'kling/kling-3.0-pro/start-end-frame-to-video',
    'kling/kling-3-0-standard-text-to-video': 'kling/kling-3.0-standard/text-to-video',
    'kling/kling-3-0-standard-image-to-video': 'kling/kling-3.0-standard/image-to-video',
    'kling/kling-3-0-standard-start-end-frame-to-video': 'kling/kling-3.0-standard/start-end-frame-to-video',
    'kling/kling-3-0-pro-motion-control': 'kling/kling-3.0-pro/motion-control',
    'kling/kling-3-0-standard-motion-control': 'kling/kling-3.0-standard/motion-control',
    'kling/kling-2-6-pro-text-to-video': 'kling/kling-2.6-pro/text-to-video',
    'kling/kling-2-6-pro-image-to-video': 'kling/kling-2.6-pro/image-to-video',
    'kling-2-6-i2v-image-to-video': 'kling/kling-2.6-i2v/image-to-video',

    // --- Wan ---
    'wan-2-6-flash-image-to-video': 'alibaba/wan-2.6-flash/image-to-video',
    'wan-2-6-super-image-to-video': 'alibaba-plus/wan-2.6-super/image-to-video',

    // --- Seedance ---
    'seedance-1-5-pro-super-image-to-video': 'bytedance-plus/seedance-1.5-pro-super/image-to-video',
    'seedance-1-5-pro-super-start-end-frame-to-video': 'bytedance-plus/seedance-1.5-pro-super/start-end-frame-to-video',

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
    'gen-4-turbo-image-edit-image': 'runway/gen-4-turbo-image/edit-image',

    // --- Veo 3.1 (EachLabs) - legacy keys ---
    'veo-3-1-eachlabs-image-to-video': 'google/veo-3.1-eachlabs/image-to-video',
    'veo-3-1-eachlabs-start-end-frame-to-video': 'google/veo-3.1-eachlabs/start-end-frame-to-video',

    // --- Alibaba Plus Wan ---
    'wan-2-6-text-to-video': 'alibaba-plus/wan-2.6/text-to-video',
    'wan-2-6-image-to-video': 'alibaba-plus/wan-2.6/image-to-video',
    'wan-2-6-reference-to-video': 'alibaba-plus/wan-2.6/reference-to-video',
    'wan-2-6-video-extend': 'alibaba-plus/wan-2.6/video-extend',
    'wan-2-6-flash-reference-to-video': 'alibaba-plus/wan-2.6-flash/reference-to-video',
    'wan-2-6-pro-image-to-video': 'alibaba-plus/wan-2.6-pro/image-to-video',
    'wan-2-7-text-to-video': 'alibaba-plus/wan-2.7/text-to-video',
    'wan-2-7-image-to-video': 'alibaba-plus/wan-2.7/image-to-video',
    'wan-2-7-reference-to-video': 'alibaba-plus/wan-2.7/reference-to-video',
    'wan-2-7-text-to-image': 'alibaba-plus/wan-2.7/text-to-image',
    'wan-2-7-image-to-image': 'alibaba-plus/wan-2.7/image-to-image',
    'wan-2-7-pro-text-to-image': 'alibaba-plus/wan-2.7-pro/text-to-image',
    'wan-2-7-pro-image-to-image': 'alibaba-plus/wan-2.7-pro/image-to-image',

    // --- ByteDance Seedance 2.0 ---
    'seedance-2-0-text-to-video': 'bytedance/seedance-2.0/text-to-video',
    'seedance-2-0-image-to-video': 'bytedance/seedance-2.0/image-to-video',
    'seedance-2-0-start-end-frame-to-video': 'bytedance/seedance-2.0/start-end-frame-to-video',
    'seedance-2-0-omni-reference': 'bytedance/seedance-2.0/omni-reference',
    'seedance-2-0-fast-text-to-video': 'bytedance/seedance-2.0-fast/text-to-video',
    'seedance-2-0-fast-image-to-video': 'bytedance/seedance-2.0-fast/image-to-video',
    'seedance-2-0-fast-start-end-frame-to-video': 'bytedance/seedance-2.0-fast/start-end-frame-to-video',
    'seedance-2-0-fast-omni-reference': 'bytedance/seedance-2.0-fast/omni-reference',

    // --- ByteDance Plus Seedream ---
    'seedream-v4-5-text-to-image': 'bytedance-plus/seedream-v4.5/text-to-image',
    'seedream-v4-5-image-to-image': 'bytedance-plus/seedream-v4.5/image-to-image',
    'seedream-v5-lite-text-to-image': 'bytedance-plus/seedream-v5-lite/text-to-image',
    'seedream-v5-lite-image-to-image': 'bytedance-plus/seedream-v5-lite/image-to-image',

    // --- Google New ---
    'nano-banana-dev-text-to-image': 'google/nano-banana-dev/text-to-image',
    'nano-banana-pro-extra-edit-image': 'google/nano-banana-pro-extra/edit-image',
    'veo-3-1-text-to-video': 'google/veo-3.1/text-to-video',
    'veo-3-1-image-to-video': 'google/veo-3.1/image-to-video',
    'veo-3-1-reference-to-video': 'google/veo-3.1/reference-to-video',
    'veo-3-1-start-end-frame-to-video': 'google/veo-3.1/start-end-frame-to-video',
    'veo-3-1-fast-start-end-frame-to-video': 'google/veo-3.1-fast/start-end-frame-to-video',
    'veo-3-1-ecl-image-to-video': 'google/veo-3.1-ecl/image-to-video',
    'veo-3-1-ecl-start-end-frame-to-video': 'google/veo-3.1-ecl/start-end-frame-to-video',

    // --- Kling Base v2.5/v2.6/v3/o1 (real model IDs in slug) ---
    'kling-text2video-v25-text-to-video': 'kling/kling-text2video-v25/text-to-video',
    'kling-i2v-frames-v25-image-to-video': 'kling/kling-i2v-frames-v25/image-to-video',
    'kling-i2v-frames-v25-start-end-frame-to-video': 'kling/kling-i2v-frames-v25/start-end-frame-to-video',
    'kling-text2video-v26-text-to-video': 'kling/kling-text2video-v26/text-to-video',
    'kling-i2v-frames-v26-image-to-video': 'kling/kling-i2v-frames-v26/image-to-video',
    'kling-i2v-frames-v26-start-end-frame-to-video': 'kling/kling-i2v-frames-v26/start-end-frame-to-video',
    'kling-text2video-v3-text-to-video': 'kling/kling-text2video-v3/text-to-video',
    'kling-i2v-frames-v3-image-to-video': 'kling/kling-i2v-frames-v3/image-to-video',
    'kling-i2v-frames-v3-start-end-frame-to-video': 'kling/kling-i2v-frames-v3/start-end-frame-to-video',
    'kling-elements-i2v-v3-image-to-video-elements': 'kling/kling-elements-i2v-v3/image-to-video-elements',
    'kling-extend-v3-extend-video': 'kling/kling-extend-v3/extend-video',
    'kling-motion-create-v3-motion-transfer-to-video': 'kling/kling-motion-create-v3/motion-transfer-to-video',
    'kling-omni-o1-text-to-video': 'kling/kling-omni-o1/text-to-video',
    'kling-omni-o1-image-to-video': 'kling/kling-omni-o1/image-to-video',
    'kling-i2v-frames-o1-start-end-frame-to-video': 'kling/kling-i2v-frames-o1/start-end-frame-to-video',

    // --- Kling Plus (path-disambiguated with kling-plus/ prefix) ---
    'kling-plus/kling-2-1-master-text-to-video': 'kling-plus/kling-2.1-master/text-to-video',
    'kling-plus/kling-2-1-master-image-to-video': 'kling-plus/kling-2.1-master/image-to-video',
    'kling-plus/kling-2-1-pro-image-to-video': 'kling-plus/kling-2.1-pro/image-to-video',
    'kling-plus/kling-2-1-pro-start-end-frame-to-video': 'kling-plus/kling-2.1-pro/start-end-frame-to-video',
    'kling-plus/kling-2-5-turbo-pro-text-to-video': 'kling-plus/kling-2.5-turbo-pro/text-to-video',
    'kling-plus/kling-2-5-turbo-pro-image-to-video': 'kling-plus/kling-2.5-turbo-pro/image-to-video',
    'kling-plus/kling-2-5-turbo-standard-image-to-video': 'kling-plus/kling-2.5-turbo-standard/image-to-video',
    'kling-plus/kling-2-6-pro-text-to-video': 'kling-plus/kling-2.6-pro/text-to-video',
    'kling-plus/kling-2-6-pro-image-to-video': 'kling-plus/kling-2.6-pro/image-to-video',
    'kling-plus/kling-2-6-pro-motion-control': 'kling-plus/kling-2.6-pro/motion-control',
    'kling-plus/kling-2-6-standard-text-to-video': 'kling-plus/kling-2.6-standard/text-to-video',
    'kling-plus/kling-2-6-standard-image-to-video': 'kling-plus/kling-2.6-standard/image-to-video',
    'kling-plus/kling-2-6-standard-motion-control': 'kling-plus/kling-2.6-standard/motion-control',
    'kling-plus/kling-3-0-pro-text-to-video': 'kling-plus/kling-3.0-pro/text-to-video',
    'kling-plus/kling-3-0-pro-image-to-video': 'kling-plus/kling-3.0-pro/image-to-video',
    'kling-plus/kling-3-0-pro-start-end-frame-to-video': 'kling-plus/kling-3.0-pro/start-end-frame-to-video',
    'kling-plus/kling-3-0-pro-motion-control': 'kling-plus/kling-3.0-pro/motion-control',
    'kling-plus/kling-3-0-standard-text-to-video': 'kling-plus/kling-3.0-standard/text-to-video',
    'kling-plus/kling-3-0-standard-image-to-video': 'kling-plus/kling-3.0-standard/image-to-video',
    'kling-plus/kling-3-0-standard-start-end-frame-to-video': 'kling-plus/kling-3.0-standard/start-end-frame-to-video',
    'kling-plus/kling-3-0-standard-motion-control': 'kling-plus/kling-3.0-standard/motion-control',
    'kling-plus/kling-o1-pro-text-to-video': 'kling-plus/kling-o1-pro/text-to-video',
    'kling-plus/kling-o1-pro-image-to-video': 'kling-plus/kling-o1-pro/image-to-video',
    'kling-plus/kling-o1-pro-reference-to-video': 'kling-plus/kling-o1-pro/reference-to-video',
    'kling-plus/kling-o1-pro-start-end-frame-to-video': 'kling-plus/kling-o1-pro/start-end-frame-to-video',
    'kling-plus/kling-o1-pro-video-edit': 'kling-plus/kling-o1-pro/video-edit',
    'kling-plus/kling-o1-pro-video-edit-fast': 'kling-plus/kling-o1-pro/video-edit-fast',
    'kling-plus/kling-o1-standard-text-to-video': 'kling-plus/kling-o1-standard/text-to-video',
    'kling-plus/kling-o1-standard-image-to-video': 'kling-plus/kling-o1-standard/image-to-video',
    'kling-plus/kling-o1-standard-reference-to-video': 'kling-plus/kling-o1-standard/reference-to-video',
    'kling-plus/kling-o1-standard-start-end-frame-to-video': 'kling-plus/kling-o1-standard/start-end-frame-to-video',
    'kling-plus/kling-o1-standard-video-edit': 'kling-plus/kling-o1-standard/video-edit',
    'kling-plus/kling-o3-pro-text-to-video': 'kling-plus/kling-o3-pro/text-to-video',
    'kling-plus/kling-o3-pro-image-to-video': 'kling-plus/kling-o3-pro/image-to-video',
    'kling-plus/kling-o3-pro-reference-to-video': 'kling-plus/kling-o3-pro/reference-to-video',
    'kling-plus/kling-o3-pro-start-end-frame-to-video': 'kling-plus/kling-o3-pro/start-end-frame-to-video',
    'kling-plus/kling-o3-pro-video-edit': 'kling-plus/kling-o3-pro/video-edit',
    'kling-plus/kling-o3-standard-text-to-video': 'kling-plus/kling-o3-standard/text-to-video',
    'kling-plus/kling-o3-standard-image-to-video': 'kling-plus/kling-o3-standard/image-to-video',
    'kling-plus/kling-o3-standard-reference-to-video': 'kling-plus/kling-o3-standard/reference-to-video',
    'kling-plus/kling-o3-standard-start-end-frame-to-video': 'kling-plus/kling-o3-standard/start-end-frame-to-video',
    'kling-plus/kling-o3-standard-video-edit': 'kling-plus/kling-o3-standard/video-edit',

    // --- MiniMax Plus Hailuo 2.3 ---
    'hailuo-2-3-standard-text-to-video': 'minimax-plus/hailuo-2.3-standard/text-to-video',
    'hailuo-2-3-standard-image-to-video': 'minimax-plus/hailuo-2.3-standard/image-to-video',
    'hailuo-2-3-pro-text-to-video': 'minimax-plus/hailuo-2.3-pro/text-to-video',
    'hailuo-2-3-pro-image-to-video': 'minimax-plus/hailuo-2.3-pro/image-to-video',
    'hailuo-2-3-fast-image-to-video': 'minimax-plus/hailuo-2.3-fast/image-to-video',
    'hailuo-2-3-fast-pro-image-to-video': 'minimax-plus/hailuo-2.3-fast-pro/image-to-video',

    // --- PixelByte Plus Pixel Image ---
    'pixel-image-1-0-text-to-image': 'pixelbyte-plus/pixel-image-1.0/text-to-image',
    'pixel-image-1-0-image-to-image': 'pixelbyte-plus/pixel-image-1.0/image-to-image',
    'pixel-image-1-0-pro-text-to-image': 'pixelbyte-plus/pixel-image-1.0-pro/text-to-image',
    'pixel-image-1-0-pro-image-to-image': 'pixelbyte-plus/pixel-image-1.0-pro/image-to-image'
  };

  function getModelSlug() {
    var path = window.location.pathname;
    var keys = Object.keys(MODEL_MAP);
    // Sort keys by length DESC so longer/more specific keys match first
    keys.sort(function (a, b) { return b.length - a.length; });
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
