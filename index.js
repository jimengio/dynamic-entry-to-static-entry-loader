module.exports = function(source) {
  const entryRegex = /dynamicEntry:\sasync\s\(\)\s=>\s{\n.*?import\("(.*?)"\).*?\n\s*},/;
  const entryMatch = entryRegex.exec(source);

  if (entryMatch) {
    const importPath = entryMatch[1];

    if (importPath) {
      const transformToStaicImport = `import index from "${importPath}";`;
      const transformedEntry = `entry: index,`;

      source = source.replace(entryMatch[0], transformedEntry);
      source = transformToStaicImport + "\n" + source;
    }
  }

  return source;
};
