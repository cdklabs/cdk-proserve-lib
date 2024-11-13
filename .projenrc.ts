import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import {
    YarnNodeLinker,
    NodePackageManager,
    QuoteProps,
    TrailingComma,
    ArrowParens,
    EndOfLine
} from 'projen/lib/javascript';

const deps = [
    '@aws-sdk/client-ssm@3.600.0',
    '@aws-sdk/client-opensearch@3.600.0',
    '@aws-sdk/client-imagebuilder@3.600.0',
    '@types/aws-lambda@8.10.141',
    'axios@1.7.7'
];

const project = new CdklabsConstructLibrary({
    author: 'Derrike Nunn',
    authorAddress: 'nunnderr@amazon.com',
    cdkVersion: '2.160.0',
    defaultReleaseBranch: 'main',
    deps: deps,
    bundledDeps: deps,
    devDeps: ['cdklabs-projen-project-types', 'aws-sdk-client-mock', 'esbuild'],
    name: '@cdklabs/cdk-proserve-lib',
    packageName: '@cdklabs/cdk-proserve-lib',
    projenrcTs: true,
    gitignore: ['.DS_Store', '.python-version', '.nvmrc'],
    packageManager: NodePackageManager.YARN_BERRY,
    prettier: true,
    prettierOptions: {
        settings: {
            tabWidth: 4,
            useTabs: false,
            semi: true,
            singleQuote: true,
            quoteProps: QuoteProps.ASNEEDED,
            trailingComma: TrailingComma.NONE,
            bracketSpacing: true,
            arrowParens: ArrowParens.ALWAYS,
            endOfLine: EndOfLine.LF
        }
    },
    yarnBerryOptions: {
        yarnRcOptions: {
            enableTelemetry: false,
            nodeLinker: YarnNodeLinker.NODE_MODULES
        }
    }
});

project.tasks.tryFind('rosetta:extract')?.updateStep(0, {
    exec: 'yarn jsii-rosetta extract'
});

project.addScripts({
    'generate:enum':
        'npx ts-node ./src/constructs/ec2-image-pipeline/scripts/generate.ts'
});
project.synth();
