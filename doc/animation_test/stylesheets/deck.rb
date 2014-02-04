require_relative "cards"

class Deck
	attr_accessor :rank, :suit

	def initialize
		ranks = %w(Ace 2 3 4 5 6 7 8 9 10 Jack Queen King)
		suits = %w(Clubs Hearts Spades Diamonds)

		@deck = []

		ranks.each do |rank|
			@cards << Card.new(rank, suit[0])
			@cards << Card.new(rank, suit[1])
			@cards << Card.new(rank, suit[2])
			@cards << Card.new(rank, suit[3])
		end

		# while @deck.length < 52 do
		# 	card = Card.new
		# 	if @deck.include?(card) == false
		# 		@deck << card.to_s
		# 	end
		# end
	end

	def shuffle
		@deck.shuffle!
	end
end
