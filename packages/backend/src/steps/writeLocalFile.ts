import { resolveSafeChildPath } from '@backstage/backend-plugin-api';
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs-extra';
// import { type z } from 'zod';

export const createNewFileAction = () => {
  return createTemplateAction({
    id: 'file:create',
    description: 'Create a file.',
    schema: {
      input: {
        contents: z => z.string({ description: 'The contents of the file' }),
        filename: z =>
          z.string({
            description: 'The reslative filename of the file that will be created',
          })
      },
    },

    async handler(ctx) {
      ctx.logger.info('workspacePath: ' + ctx.workspacePath);
      ctx.logger.info('input filename: ' + ctx.input.filename);
      await fs.outputFile(
        resolveSafeChildPath("/tmp/output", ctx.input.filename),
        ctx.input.contents,
      );
    },
  });
};
