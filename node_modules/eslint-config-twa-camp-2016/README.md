Install dependencies
--------------------

```
npm install -g eslint

npm install -g eslint-plugin-extra-rules
npm install -g eslint-plugin-xo
npm install -g eslint-plugin-spellcheck
npm install -g eslint-plugin-node

npm install -g eslint-config-twa-camp-2016
```

Check
-----

```
cd project
eslint . -c twa-camp-2016 --no-eslintrc
```

Update
------

If this config is updated, you can reinstall it:

```
npm install -g eslint-config-twa-camp-2016
```