/**
 * 确认对话框(v3 拆分) — 危险操作二次确认
 */

/**
 * 显示确认对话框
 * @param containerEl 容器元素(通常为设置面板 containerEl)
 * @param t           i18n 翻译函数
 * @param title       对话框标题
 * @param desc        描述文案
 * @param onConfirm   确认回调
 */
export function createConfirmDialog(
  containerEl: HTMLElement,
  t: (key: string) => string,
  title: string,
  desc: string,
  onConfirm: () => Promise<void>
): void {
  // 背景遮罩
  const backdrop = containerEl.createDiv({ cls: 'pc-confirm-backdrop' });

  // 对话框
  const dialog = containerEl.createDiv({ cls: 'pc-confirm-dialog' });
  dialog.createDiv({ cls: 'pc-confirm-dialog-title', text: title });
  dialog.createDiv({ cls: 'pc-confirm-dialog-desc', text: desc });

  const actions = dialog.createDiv({ cls: 'pc-confirm-dialog-actions' });

  // 取消按钮
  const cancelBtn = actions.createEl('button', {
    text: t('confirm.cancel'),
    attr: { cls: 'pc-confirm-cancel-btn' },
  });
  cancelBtn.addEventListener('click', () => {
    backdrop.remove();
    dialog.remove();
  });

  // 确认按钮
  const confirmBtn = actions.createEl('button', {
    text: t('confirm.confirm'),
    attr: { cls: 'pc-confirm-confirm-btn mod-warning' },
  });
  confirmBtn.addEventListener('click', async () => {
    backdrop.remove();
    dialog.remove();
    await onConfirm();
  });
}