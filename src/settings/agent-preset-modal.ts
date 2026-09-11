/**
 * 智能体预设名称/描述输入弹窗(v3)
 */
import { App, Modal } from 'obsidian';
import { t } from '../utils/i18n';

export class AgentPresetNameModal extends Modal {
  private readonly titleText: string;
  private readonly namePlaceholder: string;
  private readonly descPlaceholder: string;
  private readonly initialName: string;
  private readonly initialDesc: string;
  private readonly onSubmit: (name: string, desc: string) => void;

  constructor(
    app: App,
    title: string,
    namePlaceholder: string,
    descPlaceholder: string,
    initialName: string,
    initialDesc: string,
    onSubmit: (name: string, desc: string) => void
  ) {
    super(app);
    this.titleText = title;
    this.namePlaceholder = namePlaceholder;
    this.descPlaceholder = descPlaceholder;
    this.initialName = initialName;
    this.initialDesc = initialDesc;
    this.onSubmit = onSubmit;
  }

  onOpen(): void {
    const { contentEl, titleEl } = this;
    titleEl.setText(this.titleText);

    const form = contentEl.createDiv({ cls: 'pc-agent-form' });

    const nameInput = form.createEl('input', {
      type: 'text',
      cls: 'pc-agent-input',
      attr: { placeholder: this.namePlaceholder, value: this.initialName },
    });

    const descInput = form.createEl('input', {
      type: 'text',
      cls: 'pc-agent-input',
      attr: { placeholder: this.descPlaceholder, value: this.initialDesc },
    });

    const actions = form.createDiv({ cls: 'pc-agent-form-actions' });
    const cancelBtn = actions.createEl('button', { text: t('confirm.cancel'), cls: 'pc-agent-form-cancel' });
    const confirmBtn = actions.createEl('button', {
      text: t('confirm.ok'),
      cls: 'pc-agent-form-confirm mod-cta',
    });

    const submit = (): void => {
      const name = nameInput.value.trim();
      if (!name) return;
      this.onSubmit(name, descInput.value.trim());
      this.close();
    };

    confirmBtn.addEventListener('click', submit);
    cancelBtn.addEventListener('click', () => this.close());
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });

    setTimeout(() => nameInput.focus(), 50);
  }

  onClose(): void {
    this.contentEl.empty();
  }
}