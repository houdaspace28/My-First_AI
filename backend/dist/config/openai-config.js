import { Configuration } from "openai";
export const configureOpenai = () => {
    const config = new Configuration({
        apiKey: process.env.OPENAI_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION,
    });
    return config;
};
//# sourceMappingURL=openai-config.js.map