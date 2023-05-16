import { createClient } from '@sanity/client'

const client = createClient({
    projectId: "r0ke15gn",
    dataset: "production", // this is from those question during 'sanity init'
    useCdn: false,
    apiVersion: "2021-10-21"
    
});

export default client;