import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'design_handoff_nahom_resume_site/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
];

export default eslintConfig;
