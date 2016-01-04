<?php

namespace AppBundle\ElasticaBundle\SearchRepository;

use FOS\ElasticaBundle\Repository;
use AppBundle\ElasticaBundle\Model\AdvancedSearch;

class VoitureRepository extends Repository
{

	public function searchKey($key){
		if($key){	
			$bool = new \Elastica\Query\Bool();

			$bool->addShould(new \Elastica\Query\Match('prix',$key));
			$bool->addShould(new \Elastica\Query\Match('kmParcouru',$key));
			$bool->addShould(new \Elastica\Query\Match('boitier.libelleBoitier',$key));
			$bool->addShould(new \Elastica\Query\Match('carburant.libelleCarburant',$key));
			$bool->addShould(new \Elastica\Query\Match('modeleMarque.modele.libelleModele',$key));
			$bool->addShould(new \Elastica\Query\Match('modeleMarque.marque.libelleMarque',$key));

			$query = \Elastica\Query::create($bool);
		}
		else{
			$match = new \Elastica\Query\MatchAll();

			$query = \Elastica\Query::create($match);
		}

		

		return $this->find($query);
	}

	public function searchAdvanced(AdvancedSearch $advancedSearch){

		$match = new \Elastica\Query\MatchAll();

/*		if(!$advancedSearch->innerObjectIsDefine()){
			$match = new \Elastica\Query\MatchAll();
		}
		else{

			$boolQuery = new \Elastica\Query\Bool();

			if($advancedSearch->getMarque()){
				$boolQuery->addMust(new \Elastica\Query\Match('modeleMarque.marque.id',$advancedSearch->getMarque()));
			}

			if($advancedSearch->getModele()){
				$boolQuery->addMust(new \Elastica\Query\Match('modeleMarque.modele.id',$advancedSearch->getModele()));
			}

			if($advancedSearch->getBoitier()){
				$boolQuery->addMust(new \Elastica\Query\Match('boitier.id',$advancedSearch->getBoitier()));
			}

			if($advancedSearch->getCarburant()){
				$boolQuery->addMust(new \Elastica\Query\Match('carburant.id',$advancedSearch->getCarburant()));
			}
		}*/


		$boolFilter = new \Elastica\Filter\Bool();

		if($advancedSearch->getPrixMin()){
			$boolFilter->addMust(new \Elastica\Filter\Range('prix',array('gte'=>intval($advancedSearch->getPrixMin()))));
		}
		if($advancedSearch->getPrixMax()){
			$boolFilter->addMust(new \Elastica\Filter\Range('prix',array('lte'=>$advancedSearch->getPrixMax())));
		}

		$filtered = new \Elastica\Query\Filtered($match,$boolFilter);


/*		if($match){
			$filtered = new \Elastica\Query\Filtered($match,$boolFilter);
		}
		else{
			$filtered = new \Elastica\Query\Filtered($boolQuery,$boolFilter);
		}
*/

		$query = \Elastica\Query::create($filtered);

		return $this->find($query);
	}

}
