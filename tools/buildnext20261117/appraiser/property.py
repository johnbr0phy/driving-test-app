ITEMS=[]
def family(options,rows):
 for i,(q,e) in enumerate(rows):ITEMS.append((q,[options[i]]+options[:i]+options[i+1:],e))
family(['Fee simple interest','Leased fee interest','Leasehold interest','Life estate interest'],[
('A house is owned outright, with no private lease or other private encumbrance identified; only governmental limitations remain. Which interest is being valued?','The fee simple interest is the full ownership estate subject to governmental limitations.'),
('An owner has leased a duplex and retains the right to contractual rent and possession when the lease expires. Which interest does the owner hold?','The landlord retains the leased fee; the tenant holds the leasehold.'),
('A tenant holds the contractual right to occupy a dwelling for five more years. Which property interest is being analyzed for that tenant?','The tenant\'s possessory rights under the lease constitute a leasehold interest.'),
('A deed grants possession for the lifetime of a named individual, after which possession passes to another person. Which present interest is described?','A life estate lasts for a specified person\'s lifetime, with a remainder or reversion following it.')])
family(['Metes-and-bounds description','Recorded lot-and-block description','Rectangular survey description','Street-address identification'],[
('A deed begins at a monument and follows bearings and measured distances around a parcel back to the beginning. Which description method is used?','Metes and bounds follows the parcel\'s boundary courses and distances from a point of beginning.'),
('A deed identifies Lot 8, Block 3, of a named subdivision and cites its recorded map book and page. Which description method is used?','A recorded plat or lot-and-block reference identifies the parcel within a subdivision map.'),
('A deed identifies land by a fraction of a section within a specified township and range. Which description method is used?','The rectangular survey system uses principal meridians, baselines, townships, ranges and sections.'),
('A delivery record identifies a property only as 18 Willow Lane, without boundary courses, a plat reference or a survey-system reference. What identification has it supplied?','A street address helps locate a property, but it is not by itself one of the complete legal-description methods offered.')])
family(['Frontage','Depth','Topography','Drainage'],[
('A site report measures the length of the parcel boundary adjoining its access street. Which site characteristic is measured?','Frontage is the extent of the site along the identified street or other specified boundary.'),
('A rectangular lot extends 140 feet from its street boundary to its rear boundary. Which dimension is described?','Depth measures the front-to-rear extent, rather than the street-facing length.'),
('Contour mapping shows that a site rises sharply toward the rear. Which site characteristic does this describe?','Topography describes the land\'s surface relief, slope and contour.'),
('After rainfall, water accumulates in a low corner and leaves the site slowly. Which site characteristic should be investigated directly?','Drainage concerns the movement and removal of water; slope can affect it but is not the whole issue.')])
family(['Public zoning restriction','Private deed restriction','Access easement','Boundary encroachment'],[
('A city ordinance limits a parcel to residential use. Which source of limitation applies?','A municipal zoning ordinance is a public land-use restriction.'),
('A recorded covenant imposed by an earlier owner prohibits detached workshops, although zoning permits them. Which source of limitation applies?','A covenant imposed through private title arrangements is a private restriction, distinct from zoning.'),
('A recorded right allows a neighbor to cross a defined strip to reach a public road without owning the strip. What interest is described?','An access easement permits a specified use of another parcel without transferring ownership of the strip.'),
('A survey shows that a garage wall physically extends two feet over the lot line without an identified right to occupy that area. What issue is identified?','A physical intrusion across a property boundary is an encroachment; the legal consequences require separate investigation.')])
family(['1,200 square feet','1,500 square feet','1,800 square feet','2,100 square feet'],[
('For a geometry exercise, a rectangular footprint measures 30 feet by 40 feet, with no offsets. What is its area?','Area is length × width: 30 × 40 = 1,200 square feet. This is footprint geometry, not a claim about a reporting standard\'s living-area rules.'),
('An L-shaped footprint consists of a 40-by-40-foot rectangle with a 10-by-10-foot corner cut out. What area remains?','The area is 1,600 - 100 = 1,500 square feet.'),
('A triangular parcel has a base of 60 feet and a perpendicular height of 60 feet. What is its area?','Triangle area is one-half × base × height: 0.5 × 60 × 60 = 1,800 square feet.'),
('Two nonoverlapping rectangular wings measure 30 by 50 feet and 20 by 30 feet. What is their combined footprint area?','The areas are 1,500 and 600 square feet, totaling 2,100 square feet.')])
assert len(ITEMS)==20
