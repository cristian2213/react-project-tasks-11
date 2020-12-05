import { createContext } from 'react';

// warning: the provider will be executed into the ProjectState to go past the reducer 
const ProjectContext = createContext();

export default ProjectContext; 