// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EntityType } from '../base';
import { TemplateProvisioner, TemplateType } from './base';

/**
 * Provisioner for component templates within an Amazon OpenSearch Service domain
 */
export class ComponentTemplateProvisioner extends TemplateProvisioner {
    protected override templateType: TemplateType = 'component';
    protected override type: EntityType = `templates/${this.templateType}`;
}
