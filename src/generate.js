/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//@ts-check

const path = require('path');
const { Generator } = require('./generator');
const { JavaScriptFormatter } = require('./format_js');
const { PythonFormatter } = require('./format_python');
const { JavaFormatter } = require('./format_java');
const { CSharpFormatter } = require('./format_csharp');

new Generator('js', path.join(__dirname, '..', 'nodejs', 'docs'), new JavaScriptFormatter());
new Generator('python', path.join(__dirname, '..', 'python', 'docs'), new PythonFormatter());
new Generator('java', path.join(__dirname, '..', 'java', 'docs'), new JavaFormatter());
new Generator('csharp', path.join(__dirname, '..', 'csharp', 'docs'), new CSharpFormatter());
