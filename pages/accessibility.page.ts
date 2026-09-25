import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';

const RELEVANT_IMPACTS = new Set(['critical', 'serious']);

export interface AccessibilityViolationSummary {
  impact: string;
  id: string;
  description: string;
  elementCount: number;
}

export class AccessibilityPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async findCriticalOrSeriousViolations(): Promise<AccessibilityViolationSummary[]> {
    const results = await new AxeBuilder({ page: this.page }).analyze();
    return results.violations
      .filter((violation) => RELEVANT_IMPACTS.has(violation.impact ?? ''))
      .map((violation) => ({
        impact: violation.impact ?? 'desconhecido',
        id: violation.id,
        description: violation.description,
        elementCount: violation.nodes.length,
      }));
  }
}
