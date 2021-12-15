content = File.read("./input.txt")

prev = nil
curr = nil
count = 0
content.each_line do |line|
  curr = line.to_i
  if prev && curr
    if curr > prev
      count = count + 1
    end
  end
  prev = curr
end

puts count
