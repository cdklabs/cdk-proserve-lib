# Example: AOS Provisioning and Flow

CDK example to create an [Amazon OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html) neural search pipeline using TypeScript.
The example demonstrates setting up an OpenSearch domain, provisioning indexes with ML configurations, and deploying automated embedding workflows using CDK.

Once deployed, the domain will have a pre-configured `my-nlp-index` with vector search capabilities.
When you ingest documents, the pipeline automatically generates embeddings using the deployed language model:

```json
{
    "_index": "my-nlp-index",
    "_source": {
        "id": "1234.jpg",
        "text": "A person holds up a sign with the numbers 1234.",
        "passage_embedding": [0.1234, -0.5678, 0.9012, ...]
    }
}
```

Follows the [OpenSearch neural search tutorial](https://docs.opensearch.org/latest/tutorials/vector-search/neural-search-tutorial/).

## Build and Deploy

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Before getting ready to deploy, ensure the dependencies are installed by executing the following:

```
$ npm install
```

### CDK Deploy

With specific profile,

```
$ npx cdk deploy --profile test
```

Using the default profile

```
$ npx cdk deploy
```
