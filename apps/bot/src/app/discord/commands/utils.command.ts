/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import {
    Context,
    createCommandGroupDecorator,
    SlashCommandContext,
    Subcommand,
} from 'necord';

export const UtilsCommandDecorator = createCommandGroupDecorator({
    name: 'utils',
    description: 'Utility commands',
});

@Injectable()
@UtilsCommandDecorator()
export class UtilsCommand {
    private readonly _logger = new Logger(UtilsCommand.name);

    @Subcommand({
        name: 'ping',
        description: 'Ping command!',
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        this._logger.log(`${interaction.user.tag} used ping command`);
        const now = Date.now();
        await interaction.reply({ content: 'Ping?' });

        const content = `Pong! Bot Latency ${Math.round(
            interaction.client.ws.ping
        )}ms. API Latency ${now - interaction.createdTimestamp}ms.`;

        return interaction.editReply(content);
    }
}
