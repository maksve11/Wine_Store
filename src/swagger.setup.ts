import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Wine Store API')
    .setDescription('The best API for wine store')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
