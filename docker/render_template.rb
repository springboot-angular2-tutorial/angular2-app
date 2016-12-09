require "erb"
require "json"

class Renderer
  include ERB::Util

  def initialize(data, template)
    @data = data
    @template = template
  end

  def render
    ERB.new(@template).result(binding)
  end
end

data = JSON.parse(File.read(File.join(File.dirname(__FILE__), 'manifest.json')))
template = File.read(File.join(File.dirname(__FILE__), 'index.html.erb'))

r = Renderer.new(data, template)
puts r.render
