// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EntityType } from '../base';
import { TemplateProvisioner, TemplateType } from './base';

/**
 * Provisioner for index templates within an Amazon OpenSearch Service domain
 */
export class IndexTemplateProvisioner extends TemplateProvisioner {
    protected override templateType: TemplateType = 'index';
    protected override type: EntityType = `templates/${this.templateType}`;
}
