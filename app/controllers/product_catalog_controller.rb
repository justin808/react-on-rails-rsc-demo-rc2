# frozen_string_literal: true

class ProductCatalogController < ApplicationController
  layout "hello_world"

  include ReactOnRailsPro::Stream

  def index
    @product_catalog_props = {
      category: "featured"
    }

    stream_view_containing_react_components(template: "product_catalog/index")
  end
end
