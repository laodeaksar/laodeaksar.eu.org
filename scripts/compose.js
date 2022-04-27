#!/usr/bin/env node

const { join } = require('path');
const { prompt } = require('inquirer');
const fs = require('fs');
const matter = require('gray-matter');

const POSTS_PATH = join(process.cwd(), 'data/blog');
const slugify = (str) => str.trim().replace(/\s+/g, '-').toLowerCase();

const getFilePath = (filename) => {
  const slug = slugify(filename);
  return join(POSTS_PATH, `${slug}.mdx`);
};

const genData = (response) => {
  const tagArray = response.tags.split(',');
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()));
  const tags = tagArray;
/**
  let d = new Date();
  const date = [
    d.getFullYear(),
    ("0" + (d.getMonth() + 1)).slice(-2),
    ("0" + d.getDate()).slice(-2),
  ].join("-");
*/
  const date = new Date().toLocaleDateString('id-ID', {
    timeZone: 'Asia/Jakarta'
  });

  const data = matter.stringify('<Callstack />', {
    title: response.title,
    description: response.description,
    date,
    updated: date,
    tags: response.tags ? tags : [],
    image: ``
  });
  return data;
};

prompt([
  {
    type: 'input',
    name: 'filename',
    message: `What is the name?`,
    required: true,
    validate: (filename) => {
      return fs.existsSync(getFilePath(filename))
        ? `${getFilePath(filename)} exists.`
        : true;
    }
  },
  {
    type: 'input',
    name: 'title',
    message: `What is the title?`,
    required: true
  },
  {
    type: 'input',
    name: 'description',
    message: `What is the description?`
  },
  {
    type: 'input',
    name: 'tags',
    message: `Any tags? Separate them with , or leave empty if no tags.`
  }
])
  .then((response) => {
    const { title, filename } = response;
    const filePath = getFilePath(filename);
    const data = genData(response);
    fs.writeFileSync(filePath, data);
    console.log(`Post ${title} was created at ${filePath}`);
    console.log(data);
  })
  .catch(console.log);
