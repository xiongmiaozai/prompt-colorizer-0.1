/**
 * 高亮规则开关 key ↔ CSS 类名映射(v3)
 * 用于让 matcher 的匹配结果按 UI 开关(highlightVariables 等)过滤
 */

/** 设置开关 key → 规则 CSS 类名 */
export const KEY_TO_CSS_CLASS: Record<string, string> = {
  // 基础模式
  highlightVariables: 'dsl-variable',
  highlightRoleTags: 'dsl-role-tag',
  highlightInstructionMarkers: 'dsl-instruction',
  // 视频提示词模式
  highlightSectionMarkers: 'dsl-block-wrapper',
  highlightShotHeaders: 'dsl-shot-header',
  highlightAssetRefs: 'dsl-asset',
  highlightFieldLabels: 'dsl-param-key',
  highlightDialogue: 'dsl-dialogue',
  highlightAudioRefs: 'dsl-audio-ref',
  highlightNegativePrompts: 'dsl-constraint',
  highlightTechParams: 'dsl-tech-param',
  highlightParentheticals: 'dsl-parenthetical',
  // SD/ComfyUI 扩展模式
  highlightEmphasisWeights: 'dsl-emphasis-weight',
  highlightLoraRefs: 'dsl-lora-ref',
  highlightBracketEmphasis: 'dsl-bracket-strong',
  highlightQualityTags: 'dsl-quality-tag',
  highlightSdNegativeHeader: 'dsl-sd-negative-header',
  // 视频提示词扩展模式
  highlightCameraMoves: 'dsl-camera-word',
  highlightSceneTransitions: 'dsl-scene-transition',
};

/** 规则 CSS 类名 → 设置开关 key(反向映射,用于按开关过滤匹配结果) */
export const CSS_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(KEY_TO_CSS_CLASS).map(([key, cssClass]) => [cssClass, key])
);