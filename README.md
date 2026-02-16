# React on Rails Pro RSC Demo (16.4.0.rc.2)

This is a generator-created sample app showing React Server Components (RSC) with streaming SSR on React on Rails Pro.

## Stack

- `react_on_rails` `16.4.0.rc.2`
- `react_on_rails_pro` `16.4.0.rc.2`
- `react-on-rails-pro` `16.4.0-rc.2`
- `react-on-rails-pro-node-renderer` `16.4.0-rc.2`
- `shakapacker` gem `9.6.0.beta.0`
- `shakapacker` npm `9.6.0-beta.0`
- React `~19.0.4`

## Routes

- `/hello_server`: baseline async server component demo
- `/products`: advanced streaming catalog demo with nested suspense boundaries

## Run

```bash
bundle install
npm install

# Required for Pro rendering:
export REACT_ON_RAILS_PRO_LICENSE=your_license_token

bin/dev
```

Then open:

- `http://localhost:3000/hello_server`
- `http://localhost:3000/products`

## Notes

- This sample was generated with:

```bash
rails generate react_on_rails:install --rsc --typescript
```

- For this demo, generated client-hook sample components were removed so the payload stays clean (`\"hasErrors\": false`) during streaming validation.
