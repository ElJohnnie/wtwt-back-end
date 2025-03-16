import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const provider = new NodeTracerProvider();

const jaegerExporter = new JaegerExporter({
  endpoint: process.env.JAEGER_ENDPOINT || 'http://jaeger:14268/api/traces'
});

provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
provider.register();

registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': {
        ignoreIncomingRequestHook: (req) => req.url === '/health',
      },
    }),
  ],
});

console.log('Tracing initialized');
